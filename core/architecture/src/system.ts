//import { RecursiveObject } from "./recursiveObject";
import { IEnvironment } from "./environment";
import { IComponent } from "./component";

/**
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CSystem {
    name: string | null = null;
    environments: {
        [key: string]: IEnvironment;
    } | null = null;
    components: {
        [key: string]: IComponent;
    } | null = null;
}

export interface ISystem extends CSystem {}

/**
 * The type of an array of the properties
 */
type ArrSystem = Array<keyof CSystem>;

/**
 * An array of the properties
 */
const propsArray: ArrSystem = Object.keys(new CSystem()) as ArrSystem;

/**
 * Get the properties from a bigger object
 */
export const filterSystem = (
    props: any,
    { fallback = {} as any, override = {} } = {},
) => {
    const data = Object.assign(
        propsArray.reduce((r: ISystem, k: keyof CSystem) => {
            // do not overwrite the IEntry values with undefined
            return {
                ...r,
                [k]: (function () {
                    if (
                        props[k] !== undefined &&
                        props[k]?.localeCompare?.("") !== 0
                    ) {
                        return props[k];
                    }
                    if (fallback[k] !== undefined) {
                        return fallback[k];
                    }
                    return r[k];
                })(),
            };
        }, new CSystem()),
        override,
    ) as ISystem;

    return data;
};

export const filterNonSystem = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(
            r,
            !propsArray.includes(k as keyof CSystem) ? { [k]: props[k] } : {},
        );
    }, {});
