export const ERROR_CONTENT = {
  400: {
    title: 'Bad Request',
    subtitle: 'Your request could use a quick coffee break.',
    footer: 'Take a sip, make fixes, and resend!',
    img: '/img/error/error-400.svg',
    buttonText: 'Refresh',
  },
  404: {
    title: 'Page Not Found',
    subtitle: 'It seems you’re lost.',
    footer: null,
    img: '/img/error/error.svg',
    buttonText: 'Back to good stuff',
  },

  500: {
    title: 'Internal Server Error',
    subtitle: 'It seems like something went wrong',
    footer: (
      <>
        Sorry about that.
        <br />
        We&apos;re trying our best to fix it!
      </>
    ),
    img: '/img/error/error-500.svg',
    buttonText: 'Refresh',
  },
  default: {
    title: 'Unable to access the network',
    subtitle: 'Please, check internet connection',
    footer: null,
    img: '/img/error/error.svg',
    buttonText: 'Refresh',
  },
}
