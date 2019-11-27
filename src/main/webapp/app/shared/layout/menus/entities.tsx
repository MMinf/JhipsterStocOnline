import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/extended-user">
      <Translate contentKey="global.menu.entities.extendedUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notifi-template">
      <Translate contentKey="global.menu.entities.notifiTemplate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/dealer">
      <Translate contentKey="global.menu.entities.dealer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/portofoliu">
      <Translate contentKey="global.menu.entities.portofoliu" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/stoc">
      <Translate contentKey="global.menu.entities.stoc" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
