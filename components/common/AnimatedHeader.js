import { useEffect } from 'react';

const onLoadAndResize = (textNoSpace, textSize) => {
  const sectionTitle = document.getElementById(`sectionTitle-${textNoSpace}`);
  const sectionTitleWidth = sectionTitle.getBoundingClientRect().width;
  const tempSpan = document.createElement('span');
  tempSpan.style.cssText = `visibility: hidden; position: absolute; top: 0; left: 0; white-space: normal; max-width: ${sectionTitleWidth}px;`;
  tempSpan.classList.add(textSize)
  tempSpan.textContent = sectionTitle.textContent;
  document.body.appendChild(tempSpan);

  setTimeout(() => {
    sectionTitle.style.height = `${tempSpan.offsetHeight + 24}px`;
  }, 50)
};

export const AnimatedHeader = ({ text, textColor, textSize, underlineColor }) => {
  const textNoSpace = text.replaceAll(' ', '-');
  const tailwindClass = `title-underline-${textNoSpace} ${underlineColor} absolute block bottom-0 left-0 right-0 before:block before:absolute before:bottom-0 before:left-0 before:right-0 before:border-b-8 before:rounded-md before:border-current before:content '' before:transition-all before:duration-700 before:transform before:-translate-x-full before:opacity-0`

  useEffect(() => {
    const el = document.querySelector(`.title-container-${textNoSpace}`);
    const beforeElement = el.querySelector(`.title-underline-${textNoSpace}`);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          beforeElement.classList.add('before:opacity-100');
          beforeElement.classList.remove('before:opacity-0');
          beforeElement.classList.add('before:translate-x-0');
          beforeElement.classList.remove('before:-translate-x-full');
        } else {
          beforeElement.classList.remove('before:opacity-100');
          beforeElement.classList.add('before:opacity-0');
          beforeElement.classList.add('before:-translate-x-full');
          beforeElement.classList.remove('before:translate-x-0');
        }
      });
    });
    observer.observe(el);

    const loadEventListener = window.addEventListener('load', () => onLoadAndResize(textNoSpace, textSize));
    const resizeEventListener = window.addEventListener('resize', () => onLoadAndResize(textNoSpace, textSize));

    return () => {
      observer.unobserve(el);
      window.removeEventListener('load', loadEventListener);
      window.removeEventListener('resize', resizeEventListener);
    };
  }, []);

  return (
    <h2 className={`title-container-${textNoSpace} ${textColor} relative overflow-hidden ${textSize} font-bold pb-4 mb-6`} id={`sectionTitle-${textNoSpace}`}>
      {text}
      <span className={tailwindClass}></span>
    </h2>
  )
}