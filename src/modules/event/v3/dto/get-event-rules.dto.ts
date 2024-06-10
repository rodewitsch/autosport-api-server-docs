import { Exclude } from 'class-transformer';
import { GetChampionshipRulesResponseDtoV3 } from '../../../championship/v3/dto/get-championship-rules.dto';

@Exclude()
export class GetEventRulesResponseDtoV3 extends GetChampionshipRulesResponseDtoV3 {
  constructor(partial: Partial<GetEventRulesResponseDtoV3>) {
    super(partial);
    Object.assign(this, partial);
  }
}
