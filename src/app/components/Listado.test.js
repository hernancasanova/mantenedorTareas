import React from "react";
import {screen, render} from '@testing-library/react';

import {Listado} from './Listado'

describe('Listado',()=>{
    it('Debe desplegar un titulo', ()=>{
        render(<Listado/>)
        expect(screen.queryByText(/listado/i)).toBeInTheDocument();
    })
}); 