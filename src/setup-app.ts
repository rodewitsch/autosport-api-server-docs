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

            const sectionObservers = new WeakMap<Element, MutationObserver>();
            const operationObservers = new WeakMap<Element, MutationObserver>();

            const handleSection = (section: Element) => {
              if (!section.classList.contains('is-open')) {
                const sectionObserver = new MutationObserver(() => {
                  console.log('sectionObserver');
                  sectionObserver.disconnect();

                  filterSectionOperations(section);
                  tagSectionOperations(section);

                  const operations = section.querySelectorAll('.opblock');
                  for (const operation of operations) {
                    operation.addEventListener('click', () => handleOperation(operation));
                  }
                });

                sectionObserver.observe(section, { childList: true, subtree: true });
                sectionObservers.set(section, sectionObserver);
              } else {
                const sectionObserver = sectionObservers.get(section);
                if (sectionObserver) {
                  sectionObserver.disconnect();
                  sectionObservers.delete(section);
                }
              }
              console.log(sectionObservers);
            };

            const handleOperation = (operation: Element) => {
              if (!operation.classList.contains('is-open')) {
                const operationObserver = new MutationObserver(() => {
                  console.log('operationObserver');
                  operationObserver.disconnect();

                  setTimeout(() => {
                    const models = operation.querySelectorAll('.model-example');
                    console.log(models);

                    if (models.length) {
                      operationObserver.disconnect();
                    }
                  }, 100);

                  // setTimeout(() => {
                  //   const blocks = operation.querySelectorAll('.opblock-section-request-body, .responses-wrapper');
                  //   console.log(blocks);
                  // }, 300);

                  // blocks.forEach((block) => {
                  //   const models = block.querySelectorAll('.model-example');
                  //   console.log(models);
                  //   models.forEach((model) => {
                  //     observeModel(model);
                  //   });
                  // });
                });

                operationObserver.observe(operation, { childList: true, subtree: true });
                operationObservers.set(operation, operationObserver);
              } else {
                const operationObserver = operationObservers.get(operation);
                if (operationObserver) {
                  operationObserver.disconnect();
                  operationObservers.delete(operation);
                }
              }
              console.log(operationObservers);
            };

            const extractOperationVersion = (operationId: string) => {
              const versionRegex = /Controller([A-Za-z0-9]+)_/;
              const version = operationId.match(versionRegex)[1];
              const operationIdWithoutVersion = operationId.replace(`Controller${version}_`, 'Controller_');
              return { operationIdWithoutVersion, version };
            };

            const tagSectionOperations = (section: Element) => {
              const operations = section.getElementsByClassName('opblock');
              const operationsMap = new Map<string, string[]>();

              for (const operation of operations) {
                const { operationIdWithoutVersion, version } = extractOperationVersion(operation.id);
                if (!operationsMap.has(operationIdWithoutVersion)) {
                  operationsMap.set(operationIdWithoutVersion, []);
                }
                operationsMap.get(operationIdWithoutVersion).push(version.toLowerCase());
              }

              for (const operation of operations) {
                const { operationIdWithoutVersion } = extractOperationVersion(operation.id);
                const operationVersions = operationsMap.get(operationIdWithoutVersion);

                const versionsDiv = window.document.createElement('div');
                versionsDiv.style.marginRight = '20px';
                versionsDiv.style.fontSize = '14px';
                versionsDiv.innerHTML = operationVersions.join(' ');

                const parentNode = operation.querySelector('.opblock-summary');
                const childNode = parentNode.querySelector('.view-line-link');
                parentNode.insertBefore(versionsDiv, childNode);
              }
            };

            const observeModel = (modelDiv: Element) => {
              const modelObserver = new MutationObserver((innerMutations) => {
                console.log('modelObserver');
                innerMutations.forEach((innerMutation) => {
                  if (
                    innerMutation.addedNodes.length &&
                    modelDiv.querySelector(':scope > div').getAttribute('data-name') === 'modelPanel'
                  ) {
                    const btns = modelDiv.querySelectorAll('button.model-box-control');
                    btns.forEach((btn) => {
                      if (btn.getAttribute('aria-expanded') === 'false') {
                        (btn as HTMLElement).click();
                      }
                    });
                  }
                });
              });
              modelObserver.observe(modelDiv, { childList: true, subtree: true });
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

              setTimeout(() => {
                window.document.querySelectorAll('.model-example').forEach((model) => {
                  observeModel(model);
                });
              }, 300);
            })();
          });
        },
      },
    });
  }

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(new ValidationPipe({ transform: true, exceptionFactory: i18nValidationErrorFactory }));
};
