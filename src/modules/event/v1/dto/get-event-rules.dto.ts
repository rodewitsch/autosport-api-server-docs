import { Exclude } from 'class-transformer';
import { GetChampionshipRulesResponseDtoV1 } from '../../../championship/v1/dto/get-championship-rules.dto';

@Exclude()
export class GetEventRulesResponseDtoV1 extends GetChampionshipRulesResponseDtoV1 {
  constructor(partial: Partial<GetEventRulesResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
