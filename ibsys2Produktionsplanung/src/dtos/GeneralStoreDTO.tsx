import {XMLInput} from './XMLInput';
import {XMLOutput} from './XMLOutput';
import {ProduktionsPlanDTO} from "./ProduktionsPlanDTO.tsx";

class GeneralStore {
    input?: XMLInput
    output?: XMLOutput
    produktionsPlan?: ProduktionsPlanDTO
}

export default GeneralStore;