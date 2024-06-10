import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsBase64, IsEnum, ValidateIf } from 'class-validator';
import dayjs from 'dayjs';
import { DriverDocumentStatus } from 'general/enums/driver-document-statuses.enum';
import { DriverDocumentType } from 'general/enums/driver-document-types.enum';
import { IsDateAfter } from '../../../../validators/is-date-after.validator';

export class GetDriverDocumentsQueryDtoV2 {
  @ApiPropertyOptional({
    description: 'Driver document type',
  })
  c_driver_document_type?: DriverDocumentType;

  @ApiPropertyOptional({
    description: 'Driver document status',
  })
  c_driver_document_status?: DriverDocumentStatus;
}

export class DocumentFileBodyDtoV2 {
  @ApiPropertyOptional({
    description: 'Document file id. (required if document_file is not provided)',
  })
  @ValidateIf((o) => !o.file)
  document_file_id?: number;

  @ApiPropertyOptional({
    name: 'file',
    description: 'Document file. (required if document_file_id is not provided)',
    type: 'string',
  })
  @ValidateIf((o) => !o.document_file_id)
  @IsBase64()
  @Transform(({ value }) => Buffer.from(value, 'base64'))
  file: Buffer;

  constructor(partial: Partial<DocumentFileBodyDtoV2>) {
    Object.assign(this, partial);
  }
}

export class AddDriverDocumentsBodyDtoV2 {
  @ApiProperty({
    description: 'Document serial/number',
  })
  document_number: 'YYYY-MM-DD';

  @ApiProperty({
    description: 'Document date from',
    default: dayjs().format('YYYY-MM-DD'),
  })
  @Transform(({ value }) => new Date(value))
  date_from: Date;

  @ApiProperty({
    description: 'Document date to',
    default: dayjs().add(1, 'year').format('YYYY-MM-DD'),
  })
  @Transform(({ value }) => new Date(value))
  @IsDateAfter('date_from', { message: 'date_to must be after date_from' })
  date_to: Date;

  @ApiProperty({
    description: 'Document type',
  })
  @IsEnum(DriverDocumentType)
  c_driver_document_type: DriverDocumentType;

  @ApiProperty({
    description: 'Document files',
    type: [DocumentFileBodyDtoV2],
  })
  @Transform(({ value }) => (value ? value.map((file) => new DocumentFileBodyDtoV2(file)) : []))
  @Type(() => DocumentFileBodyDtoV2)
  files: DocumentFileBodyDtoV2[];
}

export class UpdateDriverDocumentsBodyDtoV2 extends AddDriverDocumentsBodyDtoV2 {}

@Exclude()
export class DocumentFileResponseDtoV2 {
  @Expose()
  @ApiPropertyOptional({
    description: 'Document file id.',
  })
  document_file_id?: number;

  @Expose({ name: 'file' })
  @ApiPropertyOptional({
    name: 'file',
    description: 'Document file',
    type: 'string',
  })
  @Transform(({ value }) => value.toString('base64'))
  document_file?: Buffer;

  constructor(partial: Partial<DocumentFileResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
@Exclude()
export class DriverDocumentsResponseDtoV2 {
  @Expose()
  @ApiProperty({
    description: 'Driver document id',
  })
  driver_document_id: number;

  @Expose()
  @ApiProperty({
    description: 'Document serial/number',
  })
  document_number: string;

  @Expose()
  @ApiProperty({
    description: 'Document date from',
  })
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  date_from: Date;

  @Expose()
  @ApiProperty({
    description: 'Document date to',
  })
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  date_to: Date;

  @Expose()
  @ApiProperty({
    description: 'Document type',
  })
  c_driver_document_type: number;

  @Expose()
  @ApiProperty({
    description: 'Document type name',
    type: 'string',
  })
  driver_document_type: string;

  @Expose()
  @ApiProperty({
    description: 'Document status',
  })
  c_driver_document_status: number;

  @Expose()
  @ApiProperty({
    description: 'Document status name',
    type: 'string',
  })
  driver_document_status: string;

  @Expose({ name: 'files' })
  @ApiProperty({
    name: 'files',
    description: 'Document files',
    type: [DocumentFileResponseDtoV2],
  })
  @Type(() => DocumentFileResponseDtoV2)
  @Transform(({ value }) => value && value.map((file) => new DocumentFileResponseDtoV2(file)))
  document_files: DocumentFileResponseDtoV2[] = [];

  constructor(partial: Partial<DriverDocumentsResponseDtoV2>) {
    Object.assign(this, partial);
  }
}
