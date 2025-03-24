import { formatDate, formatDuration, prettyBytes } from './utils'
import { getTranslation } from './localizations'
import type { Embed, DuplicatiResponse, ParsedResult } from './types'

const t = getTranslation()

const ICONS: Record<ParsedResult, string> = {
  Success: ':white_check_mark:',
  Warning: ':warning:',
  Error: ':x:',
  Fatal: ':fire:'
}

const COLORS: Record<ParsedResult, number> = {
  Success: 0x00A53D,
  Warning: 0xF44900,
  Error: 0xE7000B,
  Fatal: 0xE7000B
}

interface DiscordEmbed {
  embeds: Embed[]
}

/**
 * Return an embed for an unhandled error.
 */
function unhandledError({ name, exception, reason }: { name?: string; exception?: string; reason?: string }): DiscordEmbed {
  return {
    embeds: [
      {
        author: {
          name: t('author.name'),
        },
        title: `${ICONS.Fatal} ${name ? `${name}: ` : ''}Unhandled Error`,
        description: `${exception ? `**Exception**: ${exception}` : ''}${exception && reason ? '\n' : ''}${reason ? `**Reason**: ${reason}` : ''}`,
        color: COLORS.Fatal,
      }
    ]
  }
}

export function createEmbed(res: DuplicatiResponse): DiscordEmbed {
  if (!res) {
    return unhandledError({ reason: 'No response from Duplicati' })
  }
  if (res.Exception) {
    return unhandledError({ exception: res.Exception })
  }
  if (!res.Data) {
    return unhandledError({ reason: 'No data in response' })
  }

  const { Data, Extra } = res
  const { 'backup-name': backupName, OperationName: operationName, 'machine-name': machineName } = Extra

  return {
    embeds: [
      {
        author: {
          name: t('author.name'),
        },
        title: `${ICONS[Data.ParsedResult]} ${backupName}`,
        color: COLORS[Data.ParsedResult],
        footer: {
          text: `${t('footer.operation')}: ${operationName} | ${t('footer.machineName')}: ${machineName}`
        },
        fields: [
          {
            name: t('fields.duration'),
            value: formatDuration(Data.Duration),
            inline: true
          },
          {
            name: t('fields.files'),
            value: Data.ExaminedFiles.toString(),
            inline: true
          },
          {
            name: t('fields.size'),
            value: prettyBytes(Data.SizeOfExaminedFiles),
            inline: true
          },
          {
            name: t('fields.addedFiles'),
            value: Data.AddedFiles.toString(),
            inline: true
          },
          {
            name: t('fields.modifiedFiles'),
            value: Data.ModifiedFiles.toString(),
            inline: true
          },
          {
            name: t('fields.deletedFiles'),
            value: Data.DeletedFiles.toString(),
            inline: true
          },
          {
            name: t('fields.additionalInformation'),
            value: `${t('states.started')}: ${formatDate(Data.BeginTime)}\n${t('states.finished')}: ${formatDate(Data.EndTime)}\n${t('states.interrupted')}: ${Data.Interrupted ? t('boolean.yes') : t('boolean.no')}`
          }
        ]
      }
    ]
  }
}