import { PartialType } from '@nestjs/mapped-types';
import { CreateUssDto } from './create-uss.dto';

export class UpdateUssDto extends PartialType(CreateUssDto) {}
