export const isMobile = () => {
  if (window.innerWidth < 768) {
    return true;
  }

  return false;
};

export const isTablet = () => {
  if (window.innerWidth >= 769 && window.innerWidth <= 970) {
    return true;
  }

  return false;
};

export const isDesktop = () => {
  if (window.innerWidth > 971) {
    return true;
  }

  return false;
};
