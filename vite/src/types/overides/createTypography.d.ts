import '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface FontStyle
    extends Required<{
      textTransform: TextTransform;
      fontSize: string | number; // added string
    }> {}
  export interface FontStyleOptions extends Partial<FontStyle> {
    fontSize?: string | number; // added string
  }
  export type Variant =
    | 'customInput'
    | 'mainContent'
    | 'menuCaption'
    | 'subMenuCaption'
    | 'commonAvatar'
    | 'smallAvatar'
    | 'mediumAvatar'
    | 'largeAvatar';

  export interface TypographyVariantsOptions extends Partial<Record<Variant, TypographyOptions> & FontStyleOptions> {
    customInput?: TypographyOptions;
    mainContent?: TypographyOptions;
    menuCaption?: TypographyOptions;
    subMenuCaption?: TypographyOptions;
    commonAvatar?: TypographyOptions;
    smallAvatar?: TypographyOptions;
    mediumAvatar?: TypographyOptions;
    largeAvatar?: TypographyOptions;
  }

  export interface TypographyVariants extends Record<Variant, TypographyStyle>, FontStyle, TypographyUtils {
    customInput: TypographyStyle;
    mainContent: TypographyStyle;
    menuCaption: TypographyOptions;
    subMenuCaption: TypographyOptions;
    commonAvatar: TypographyStyle;
    smallAvatar: TypographyStyle;
    mediumAvatar: TypographyStyle;
    largeAvatar: TypographyStyle;
  }
}
