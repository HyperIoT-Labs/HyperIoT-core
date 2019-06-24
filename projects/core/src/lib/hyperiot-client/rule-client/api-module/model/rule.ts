/**
 * HyperIoT Rule
 * HyperIoT Rule API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HPacket } from './hPacket';
import { HProject } from './hProject';
import { RuleAction } from './ruleAction';
import { RuleNode } from './ruleNode';


export interface Rule { 
    id?: number;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name: string;
    description: string;
    project?: HProject;
    packet?: HPacket;
    actions?: Array<RuleAction>;
    type?: Rule.TypeEnum;
    rule?: RuleNode;
    resourceName?: string;
}
export namespace Rule {
    export type TypeEnum = 'ENRICHMENT' | 'EVENT';
    export const TypeEnum = {
        ENRICHMENT: 'ENRICHMENT' as TypeEnum,
        EVENT: 'EVENT' as TypeEnum
    };
}
