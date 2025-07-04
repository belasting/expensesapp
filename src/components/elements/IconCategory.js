import React from 'react';
import { ReactComponent as IconFood } from '../../images/cat_comida.svg';
import { ReactComponent as IconShopping } from '../../images/cat_compras.svg';
import { ReactComponent as IconBills } from '../../images/bills_and_payments.svg';
import { ReactComponent as IconEntertainment } from '../../images/fun.svg';
import { ReactComponent as IconHome } from '../../images/cat_hogar.svg';
import { ReactComponent as IconClothes } from '../../images/clothing.svg';
import { ReactComponent as IconHealthHygiene } from '../../images/health_and_hygiene.svg';
import { ReactComponent as IconTransport } from '../../images/transportation.svg';

const IconCategory = ({ name }) => {
  switch (name) {
    case 'food':
      return <IconFood />;
    case 'shopping':
      return <IconShopping />;
    case 'bills and payments':
      return <IconBills />;
    case 'entertainment':
      return <IconEntertainment />;
    case 'home':
      return <IconHome />;
    case 'clothing':
      return <IconClothes />;
    case 'health_and_hygiene':
      return <IconHealthHygiene />;
    case 'transportation':
      return <IconTransport />;
    case 'fun':
      return <IconEntertainment />;
    default:
      return null;
  }
}

export default IconCategory;
