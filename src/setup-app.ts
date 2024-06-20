import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import fs from 'fs';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import path from 'path';

export const setupApp = async (app: INestApplication) => {
  app.enableShutdownHooks();
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  process.setMaxListeners(20);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('RaceLane API service')
      .setVersion('')
      .setDescription('API description for RaceLane mobile applications')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .addTag('Auth', 'Authentication and registration in the application')
      .addTag('Account', 'Requests to manage accounts data')
      .addTag('Agreement', 'Requests to get/accept agreements')
      .addTag('Classifier', 'Requests to get classifiers data')
      .addTag('Championship', 'Requests to get information about championships')
      .addTag('Driver', 'Requests to create and get information about drivers')
      .addTag('Driver documents', 'Requests to manage driver documents')
      .addTag('Driver vehicle', 'Requests to manage driver vehicles')
      .addTag('Driver tires', 'Requests to manage driver tires')
      .addTag('Event', 'Requests to get information about events')
      .addTag('Event membership', 'Requests to get and manager membership information about events')
      .addTag('Organizer', 'Get information about organizers')
      .addTag('Location', 'Requests to get information about locations')
      .addTag('Health Check', 'Health check of the application')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
      customSiteTitle: 'RaceLane API description',
      customfavIcon: `data:image/png;base64,${fs
        .readFileSync(path.resolve(__dirname, '../assets/images/swagger-favicon.ico'))
        .toString('base64')}`,
      customCss: `
      .topbar-wrapper { justify-content: space-between; }
      .topbar-wrapper svg { display:none; }
      .topbar-wrapper::before {
        content:url('data:image/png;base64,${fs
          .readFileSync(path.resolve(__dirname, '../assets/images/racelane.png'))
          .toString('base64')}'); 
        width:150px; 
        height:auto;
      }
      .swagger-ui .topbar { background-color: #007AFF; }
    `,
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        onComplete: () => {
          setTimeout(() => {
            const mountSelector = () => {
              const topBarWrapper = window.document.querySelector('.topbar-wrapper');

              const label = window.document.createElement('label');
              label.innerText = 'API version';
              label.style.fontSize = '20px';
              label.style.color = 'white';
              label.style.margin = '0 10px 0 40vw';

              const apiVersionSelector = window.document.createElement('select');
              apiVersionSelector.id = 'version-selector';
              apiVersionSelector.style.cursor = 'pointer';
              ['2', '3', '-'].forEach((version) => {
                const option = window.document.createElement('option');
                option.value = version;
                option.textContent = version;
                apiVersionSelector.appendChild(option);
              });
              const initialValue = localStorage.getItem('apiVersion') || '2';
              apiVersionSelector.value = initialValue;

              apiVersionSelector.addEventListener('change', () => {
                const sections = window.document.getElementsByClassName('opblock-tag-section is-open');
                for (const section of sections) {
                  filterSectionOperations(section);
                }
                localStorage.setItem('apiVersion', apiVersionSelector.value);
              });

              topBarWrapper.appendChild(label);
              topBarWrapper.appendChild(apiVersionSelector);
            };

            const shouldHideOperation = (operationId: string, apiVersion: string) => {
              const versionMap = {
                '2': 'V2',
                '3': 'V3',
                '-': '',
              };
              const versionValue = versionMap[apiVersion];
              return !operationId.includes(versionValue) && !operationId.includes('Neutral');
            };

            const filterSectionOperations = (section: Element) => {
              const apiVersionSelector = window.document.getElementById('version-selector') as HTMLSelectElement;
              const operations = section.getElementsByClassName('opblock');

              for (const operation of operations) {
                if (shouldHideOperation(operation.id, apiVersionSelector.value)) {
                  (operation as HTMLElement).hidden = true;
                } else {
                  (operation as HTMLElement).hidden = false;
                }
              }
            };

            const handleSection = (section: Element) => {
              if (!section.classList.contains('is-open')) {
                const sectionObserver = new MutationObserver(() => {
                  sectionObserver.disconnect();

                  filterSectionOperations(section);
                  tagSectionOperations(section);
                });

                sectionObserver.observe(section, { childList: true, subtree: true });
              }
            };

            type TField = {
              name: string;
              type: string;
            };

            class Operation {
              id: string;
              path: string;
              version: string;
              color: Colors;
              params: TField[] = [];
              body: TField[] = [];
              response: TField[] | string = [];

              constructor(private element: Element) {
                this.id = this.element.id;
                this.path = this.element.querySelector('.opblock-summary-path').querySelector('span').textContent;
                this.version = Operation.extractVersion(this.id).version;
              }

              async initialize() {
                await this.expand();
                this.params = this.computeParams();
                this.body = this.computeBody();
                this.response = this.computeResponse();
                this.toggle();
              }

              private computeParams() {
                const table = this.element.querySelector('table.parameters');
                if (!table) return [];
                const trs = table.querySelectorAll('tr[data-param-name]');
                const params: TField[] = Array.from(trs).map((tr) => ({
                  name: tr.querySelector('.parameter__name').textContent,
                  type: tr.querySelector('.parameter__type').textContent,
                }));

                return params;
              }

              private computeBody() {
                const container = this.element.querySelector('.opblock-section-request-body');
                if (!container) return [];
                const spans = container.querySelectorAll('span.hljs-attr');

                return this.parseJsonSpans(spans);
              }

              private computeResponse() {
                const spans = this.element.querySelector('tr[data-code="200"]').querySelectorAll('span.hljs-attr');
                if (!spans) return [];

                return this.parseJsonSpans(spans);
              }

              private parseJsonSpans(spans: NodeListOf<Element>) {
                const fields: TField[] = Array.from(spans).map((span) => {
                  const name = span.textContent.trim().replace(/^"(.*)"$/, '$1');
                  let type = span.nextElementSibling.textContent;

                  const isArray = type.includes('[');
                  if (!isArray) {
                    type = span.nextElementSibling.nextElementSibling.textContent.replace(/^"(.*)"$/, '$1');
                  } else {
                    type = '';
                    let typeSpan = span.nextElementSibling;
                    while (typeSpan && !typeSpan.classList.contains('hljs-attr')) {
                      if (typeSpan.textContent) {
                        type += typeSpan.textContent.trim();
                      }
                      typeSpan = typeSpan.nextElementSibling;
                    }
                  }

                  if (!isNaN(Date.parse(type))) type = 'date';

                  return { name, type };
                });

                return fields;
              }

              static extractVersion(operationId: string) {
                const versionRegex = /Controller([A-Za-z0-9]+)_/;
                const version = operationId.match(versionRegex)[1];
                const operationIdWithoutVersion = operationId.replace(`Controller${version}_`, 'Controller_');
                return { operationIdWithoutVersion, version };
              }

              private expand() {
                return new Promise<void>((resolve) => {
                  const observer = new MutationObserver(() => {
                    const expandedContent = this.element.querySelector('.model-example');
                    if (expandedContent) {
                      observer.disconnect();
                      resolve();
                    }
                  });
                  observer.observe(this.element, { childList: true, subtree: true });

                  this.toggle();
                });
              }

              private toggle() {
                (this.element.querySelector('button.opblock-control-arrow') as HTMLElement).click();
              }

              static compareOperations(op1: Operation, op2: Operation) {
                const compareFieldArrays = (arr1: TField[], arr2: TField[]) => {
                  if (arr1.length !== arr2.length) return false;

                  for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i].name !== arr2[i].name || arr1[i].type !== arr2[i].type) {
                      return false;
                    }
                  }

                  return true;
                };

                const keys = ['params', 'body', 'response'];

                return keys.every((key) => compareFieldArrays(op1[key], op2[key]));
              }
            }

            enum Colors {
              Green = 'green',
              Blue = 'blue',
              Yellow = 'yellow',
              Purple = 'purple',
              Cyan = 'cyan',
              Orange = 'orange',
              Violet = 'violet',
              DarkGreen = 'darkgreen',
              Pink = 'pink',
            }

            const groupOperationsById = (operations: Operation[]) => {
              return operations.reduce(
                (acc, operation) => {
                  const { operationIdWithoutVersion: id } = Operation.extractVersion(operation.id);
                  if (!acc[id]) {
                    acc[id] = [];
                  }
                  acc[id].push(operation);
                  return acc;
                },
                {} as Record<string, Operation[]>,
              );
            };

            const tagSectionOperations = async (section: Element) => {
              const opblocks = section.getElementsByClassName('opblock');

              const operations = Array.from(opblocks).map((opblock) => {
                return new Operation(opblock);
              });

              const initializationPromises = operations.map((operation) => operation.initialize());
              await Promise.all(initializationPromises);

              const groupedOperations = groupOperationsById(operations);

              Object.values(groupedOperations).forEach((group) => {
                group[0].color = Colors.Green;
                const colors = Object.values(Colors);

                for (let i = 1; i < group.length; i++) {
                  if (!Operation.compareOperations(group[i - 1], group[i])) {
                    group[i].color = colors[i];
                  } else {
                    group[i].color = group[i - 1].color;
                  }
                }
              });

              Object.values(groupedOperations).forEach((group) => {
                group.forEach((operation) => {
                  const operationElem = window.document.getElementById(operation.id);
                  const versions = group.map((op) => op.version);

                  const versionsDiv = window.document.createElement('div');
                  versionsDiv.style.display = 'flex';
                  versionsDiv.style.gap = '3px';
                  versionsDiv.style.margin = '0 20px';
                  versionsDiv.style.fontSize = '14px';

                  versions.forEach((version, index) => {
                    const span = window.document.createElement('span');
                    span.textContent = version;
                    span.style.fontSize = '14px';
                    span.style.color = group[index].color;
                    versionsDiv.appendChild(span);
                  });

                  const parentNode = operationElem.querySelector('.opblock-summary');
                  const childNode = parentNode.querySelector('.view-line-link');
                  parentNode.insertBefore(versionsDiv, childNode);
                });
              });
            };

            const expandSpoilers = () => {
              const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                      (node as Element).querySelectorAll('button.model-box-control').forEach((btn) => {
                        if (btn.getAttribute('aria-expanded') === 'false') {
                          (btn as HTMLElement).click();
                        }
                      });
                    }
                  });
                });
              });

              observer.observe(window.document.body, { childList: true, subtree: true });
            };

            (() => {
              mountSelector();

              const openedSection = window.document.querySelector('.opblock-tag-section.is-open');
              if (openedSection) {
                filterSectionOperations(openedSection);
                tagSectionOperations(openedSection);
              }

              const sectionsHeaders = window.document.getElementsByClassName('opblock-tag');
              for (const header of sectionsHeaders) {
                header.addEventListener('click', () => handleSection(header.parentElement));
              }

              expandSpoilers();
            })();
          });
        },
      },
    });
  }

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(new ValidationPipe({ transform: true, exceptionFactory: i18nValidationErrorFactory }));
};
