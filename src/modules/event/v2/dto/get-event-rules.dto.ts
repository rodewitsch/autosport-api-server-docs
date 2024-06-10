import { Exclude } from 'class-transformer';
import { GetChampionshipRulesResponseDtoV2 } from '../../../championship/v2/dto/get-championship-rules.dto';

@Exclude()
export class GetEventRulesResponseDtoV2 extends GetChampionshipRulesResponseDtoV2 {
  constructor(partial: Partial<GetEventRulesResponseDtoV2>) {
    super(partial);
    Object.assign(this, partial);
  }
}
