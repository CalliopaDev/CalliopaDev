/**
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CEnvironment {
    /**
     * Start the entire system in this environment
     */
    //start: ((architecture: IArchitecture) => void) | null = null;
}

export interface IEnvironment extends CEnvironment {}

/**
 * The type of an array of the properties
 */
type ArrEnvironment = Array<keyof CEnvironment>;

/**
 * An array of the properties
 */
const propsArray: ArrEnvironment = Object.keys(
    new CEnvironment(),
) as ArrEnvironment;

/**
 * Get the properties from a bigger object
 */
export const filterEnvironmentProps = (
    props: any,
    { fallback = {} as any, override = {} } = {},
) => {
    const data = Object.assign(
        propsArray.reduce((r: IEnvironment, k: keyof CEnvironment) => {
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
        }, new CEnvironment()),
        override,
    ) as IEnvironment;

    return data;
};

export const filterNonEnvironmentProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(
            r,
            !propsArray.includes(k as keyof CEnvironment)
                ? { [k]: props[k] }
                : {},
        );
    }, {});
