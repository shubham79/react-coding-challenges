import { useEffect } from 'react';

export default function useScrollToBottom(elementRef) {
  useEffect(() => {
    if (elementRef) {
      elementRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [elementRef]);
}
