/**
 * @file html 解析
 */
export type DomAttr = {
    key: string;
    value: string | number | boolean;
};
export interface ASTNode {
    tag: string;
    children: ASTNode[];
    parent: ASTNode;
    attrs: DomAttr[];
    type: number;
}
export interface TextNode extends ASTNode {
    text: string;
}
/**
 * 解析Html
 * @param html
 */
export declare const parseHTML: any;
