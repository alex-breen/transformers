

import { AutoConfig, env } from '../src/transformers.js';
import { getFile } from '../src/utils/hub.js';
import { m } from './init.js';

// Initialise the testing environment
env.allowLocalModels=false;
env.useFSCache=false;

// Load test data generated by the python tests
// TODO do this dynamically?
let testsData = await (await getFile('./tests/data/config_tests.json')).json()

describe('Configs', () => {

    for (let [configName, targetConfig] of Object.entries(testsData)) {

        it(configName, async () => {
            let config = await AutoConfig.from_pretrained(m(configName));
            expect(config.model_type).toEqual(targetConfig.model_type);
            expect(config.is_encoder_decoder).toEqual(targetConfig.is_encoder_decoder);
        });
    }
});