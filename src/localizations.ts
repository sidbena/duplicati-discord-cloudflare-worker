const locales = {
  enUS: {
    author: {
      name: 'Duplicati Discord Notification'
    },
    states: {
      started: 'Started',
      finished: 'Finished',
      interrupted: 'Interrupted',
    },
    boolean: {
      yes: 'Yes',
      no: 'No',
    },
    fields: {
      additionalInformation: 'Additional information',
      duration: 'Duration',
      files: 'Files',
      deletedFiles: 'Deleted Files',
      modifiedFiles: 'Modified Files',
      addedFiles: 'Added Files',
      size: 'Size',
    },
    footer: {
      operation: 'Operation',
      machineName: 'Machine Name',
    }
  }
} as const

type Locale = keyof typeof locales

type Paths<
  T extends Record<string, any>,
  P extends string = ''
> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? Paths<T[K], `${P}${P extends '' ? '' : '.'}${string & K}`>
    : `${P}${P extends '' ? '' : '.'}${string & K}`
}[keyof T]

type GetPaths = Paths<typeof locales.enUS>

/**
 * Function that accepts the locale and returns a function to get the localized string by dot notation.
 */
export function getTranslation(locale: Locale = 'enUS') {
  return (key: GetPaths): string => {
    const data = locales[locale]
    
    // @ts-expect-error
    return key.split('.').reduce((acc, current) => acc?.[current], data)
  }
}