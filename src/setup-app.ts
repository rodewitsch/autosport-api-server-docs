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
      },
    });
  }

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(new ValidationPipe({ transform: true, exceptionFactory: i18nValidationErrorFactory }));
};
