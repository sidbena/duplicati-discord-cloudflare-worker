import { formatDate, formatDuration, prettyBytes } from './utils'
import { enUS } from './localizations'
import type { Embed, DuplicatiResponse, ParsedResult } from './types'

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
          name: enUS.author.name,
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
          name: enUS.author.name,
        },
        title: `${ICONS[Data.ParsedResult]} ${backupName}`,
        color: COLORS[Data.ParsedResult],
        footer: {
          text: `${enUS.footer.operation}: ${operationName} | ${enUS.footer.machineName}: ${machineName}`
        },
        fields: [
          {
            name: enUS.fields.duration,
            value: formatDuration(Data.Duration),
            inline: true
          },
          {
            name: enUS.fields.files,
            value: Data.ExaminedFiles.toString(),
            inline: true
          },
          {
            name: enUS.fields.size,
            value: prettyBytes(Data.SizeOfExaminedFiles),
            inline: true
          },
          {
            name: enUS.fields.addedFiles,
            value: Data.AddedFiles.toString(),
            inline: true
          },
          {
            name: enUS.fields.modifiedFiles,
            value: Data.ModifiedFiles.toString(),
            inline: true
          },
          {
            name: enUS.fields.deletedFiles,
            value: Data.DeletedFiles.toString(),
            inline: true
          },
          {
            name: enUS.fields.additionalInformation,
            value: `${enUS.states.started}: ${formatDate(Data.BeginTime)}\n${enUS.states.finished}: ${formatDate(Data.EndTime)}\n${enUS.states.interrupted}: ${Data.Interrupted ? enUS.boolean.yes : enUS.boolean.no}`
          }
        ]
      }
    ]
  }
}