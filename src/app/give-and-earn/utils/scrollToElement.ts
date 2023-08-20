const scrollToElement = (id: string) => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
};

export default scrollToElement;
