/* eslint-disable @typescript-eslint/no-explicit-any */
function getFocusableElements(element = document) {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
    ),
  ].filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  )
}

const Accordion = {
  init(target: any) {
    const buttons = document.querySelectorAll(target)
    buttons.forEach((button) => {
      const content = button.nextElementSibling
      const focusableElements = getFocusableElements(content)
      // make focusable content unfocusable
      focusableElements.forEach((item) => {
        (item as HTMLElement).tabIndex = -1
      })

      button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
          // close drawer
          button.classList.remove('active')
          button.setAttribute('aria-expanded', false)
          content.style.maxHeight = null
          content.setAttribute('aria-hidden', true)
          // make focusable content unfocusable
          focusableElements.forEach((item) => {
            (item as HTMLElement).tabIndex = -1
          })
        } else {
          // open drawer
          button.classList.add('active')
          content.style.maxHeight = content.scrollHeight + 'px'
          content.setAttribute('aria-hidden', false)
          button.setAttribute('aria-expanded', true)
          // make focusable content focusable again
          focusableElements.forEach((item) => {
            (item as HTMLElement).tabIndex = -1
          })
        }
      })
    })
  },
}
export default Accordion
