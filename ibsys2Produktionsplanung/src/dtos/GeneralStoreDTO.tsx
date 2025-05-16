import {XMLInput} from './XMLInput';
import {XMLOutput} from './XMLOutput';
import {ProduktionsPlanDTO} from "./ProduktionsPlanDTO.tsx";
import {ProduktionsAuftragDTO} from "./ProduktionsAuftragDTO.tsx";

class GeneralStore {
    input?: XMLInput
    output?: XMLOutput
    produktionsPlan?: ProduktionsPlanDTO
    produktionsAuftrag?: ProduktionsAuftragDTO[]
}

export default GeneralStore;