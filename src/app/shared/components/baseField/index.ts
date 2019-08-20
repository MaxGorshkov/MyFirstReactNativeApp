import { Dumb } from './view';
import { IModel } from './model';

export const BaseField = (ownProps: any) => {

    const props: IModel = {
        ...ownProps,
        onChangeInput: (event: any, v: string) => {
            if (!!v && ownProps.pattern && ownProps.pattern.test && !ownProps.pattern.test(v)) {
                return;
            }
            if (ownProps.input && ownProps.input.onChange) {
                ownProps.input.onChange(event);
            }
        },
    };

    return Dumb(props);
};
