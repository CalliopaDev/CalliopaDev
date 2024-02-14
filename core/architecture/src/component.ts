//import { IEnvironmentConfig } from '@calliopa/environment';
//import { IStartableApps } from './startableApps';

/**
 * All variables MUST have a value because the transpiler would remove them
 * see: https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object
 */
export class CComponent {
    /**
     * The name of the Component component
     */
    name: string | null = null;

    /**
     * All the applications of this Component component that can/should be started
     */
    //getStartableApps: (environmentConfig: IEnvironmentConfig) => IStartableApps | null = () => null;
}

export interface IComponent extends CComponent {}

/**
 * The type of an array of the properties
 */
type ArrComponent = Array<keyof CComponent>;

/**
 * An array of the properties
 */
const propsArray: ArrComponent = Object.keys(new CComponent()) as ArrComponent;

/**
 * Get the properties from a bigger object
 */
export const filterComponentProps = (
    props: any,
    { fallback = {} as any, override = {} } = {},
) => {
    const data = Object.assign(
        propsArray.reduce((r: IComponent, k: keyof CComponent) => {
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
        }, new CComponent()),
        override,
    ) as IComponent;

    return data;
};

export const filterNonComponentProps = (props: any) =>
    Object.keys(props).reduce((r: any, k: string) => {
        return Object.assign(
            r,
            !propsArray.includes(k as keyof CComponent)
                ? { [k]: props[k] }
                : {},
        );
    }, {});
