import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';

export class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    return super.tableName(className, customName).toLowerCase(); // 将表名转换为小写
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return (
      (embeddedPrefixes && embeddedPrefixes.length ? embeddedPrefixes.join('_') + '_' : '') +
      (customName ? customName : this.camelToSnake(propertyName)) // 将驼峰命名转换为下划线命名
    );
  }

  camelToSnake(name: string): string {
    return name.replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + '_' + m[1];
    }).toLowerCase();
  }
}
