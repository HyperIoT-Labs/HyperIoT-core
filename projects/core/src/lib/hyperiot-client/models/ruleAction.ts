/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AssetTag } from './assetTag';
import { BundleContext } from './bundleContext';


export interface RuleAction { 
    actionName?: string;
    ruleId?: number;
    ruleName?: string;
    tags?: Array<AssetTag>;
    active?: boolean;
    bundleContext?: BundleContext;
    ruleType?: RuleAction.RuleTypeEnum;
}
export namespace RuleAction {
    export type RuleTypeEnum = 'ENRICHMENT' | 'EVENT';
    export const RuleTypeEnum = {
        ENRICHMENT: 'ENRICHMENT' as RuleTypeEnum,
        EVENT: 'EVENT' as RuleTypeEnum
    };
}
