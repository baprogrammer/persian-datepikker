type theme = "light" | "dark" ;
type barPosition = "top" | "right" ;
type mode = "date" | "datetime";
type calendarType = "modal" | 'normal';

export interface CalendarConfig {
  id              : string
  theme           : theme 
  sidebar         : boolean 
  sidebarPosition : barPosition
  responsive      : boolean 
  inputWidth      ?: number
  sideHeader      ?: string
  sideBg          : string
  sideColor       : string
  sideWidth       ?: number
  sideFontSize    ?: number
  calendarWidth   : number
  mode            : mode
  buttonBg        ?: string 
  buttonColor     ?: string 
  scale           ?: number
  hideOnSelect     : boolean
  closeButton      : boolean
  type             ?: calendarType
}