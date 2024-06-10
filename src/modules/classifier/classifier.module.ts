import { Module } from '@nestjs/common';
import { ClassifierTypeControllerV1 } from './v1/controllers/classifier-type.controller';
import { ClassifierControllerV1 } from './v1/controllers/classifier.controller';
import { ClassifierTypeControllerV2 } from './v2/controllers/classifier-type.controller';
import { ClassifierControllerV2 } from './v2/controllers/classifier.controller';
import { ClassifierTypeControllerV3 } from './v3/controllers/classifier-type.controller';
import { ClassifierControllerV3 } from './v3/controllers/classifier.controller';

@Module({
  imports: [],
  controllers: [
    ClassifierTypeControllerV1,
    ClassifierControllerV1,
    ClassifierTypeControllerV2,
    ClassifierControllerV2,
    ClassifierTypeControllerV3,
    ClassifierControllerV3,
  ],
  providers: [],
})
export class ClassifierModule {}
