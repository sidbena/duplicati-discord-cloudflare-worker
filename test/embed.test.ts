import { describe, expect, it } from 'vitest'
import { createEmbed } from '../src/embed'
import { success, warning } from './fixtures/duplicati'

describe('createEmbed', () => {
  it('should return an embed for a valid Duplicati response', () => {
    // @ts-expect-error
    expect(createEmbed(success)).toMatchSnapshot()
  })
  it('should return an embed for a warning', () => {
    // @ts-expect-error
    expect(createEmbed(warning)).toMatchSnapshot()
  })
  it('should return an embed for empty input', () => {
    // @ts-expect-error
    expect(createEmbed()).toMatchSnapshot()
  })
  it('should return an embed for an exception', () => {
    // @ts-expect-error
    expect(createEmbed({ Exception: 'Exception' })).toMatchSnapshot()
  })
  it('should return an embed for an empty Data', () => {
    // @ts-expect-error
    expect(createEmbed({ })).toMatchSnapshot()
  })
})
