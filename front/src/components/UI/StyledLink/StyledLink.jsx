import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './StyledLink.module.scss';

/**
 * Переиспользуемый компонент для оборачивания содержимого в стилизованную ссылку.
 */

const StyledLink = ({
  children = null,
  linkText = '',
  isExternal,
  isNavigation,
  href,
  className,
}) => {
  if (!children && !linkText) {
    return null;
  }

  if (isExternal) {
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children ?? linkText}
      </a>
    );
  }

  if (isNavigation) {
    return (
      <NavLink className={className} to={href} end>
        {children ?? linkText}
      </NavLink>
    );
  }

  return (
    <Link className={className} to={href}>
      {children ?? linkText}
    </Link>
  );
};

export default StyledLink;
