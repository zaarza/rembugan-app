import { render, screen, renderHook } from '@testing-library/react';
import AuthInput from '@/src/components/AuthInput.tsx';
import useAuthInputForm from '../tools/useAuthInputForm.tsx';

describe('Auth Input Component', () => {
    it('Should render correctly', () => {
        const form = renderHook(useAuthInputForm, {
          initialProps: {}          
        });

        render(
            <AuthInput
                name='email'
                placeholder='Email'
                label='Email address'
                formHandler={form}
                disabled={false}
            />
        );
    });
});
