export class ErrorMessageMapping {
  private mapping: { [key: string]: string; } = {}

  constructor() {
    this.mapping['22P02'] = 'エラーメッセージ22P02になります。'
  }

  public getErrorMessage(mapKey: string): string {
    return mapKey in this.mapping ? this.mapping[mapKey] : '例外的なエラーが発生しました。'
  }
}