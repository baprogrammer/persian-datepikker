# PersianDatePikker

An angular2+ persian date picker based on moment-jalaali that provide simple and beutifull calendar (shamsi - khorshidi - persian ) with full access to config

## where to use it

this module works in angular projects
supported versions : +8.0.0

## installation

step1 : run

```sh
npm i persian-datepikker
```

step2 :
add the following to your app.module

```sh
 @NgModule({
   ...
   imports: [
     ...
     PersianDatePikkerModule
   ]
 })
```

## dependencies

this module uses [moment-jalaali][jalali] so run

```sh
npm i moment-jalaali
npm i --save @types/moment-jalaali
```

## how to use

in your component add

```sh
<persian-datepikker></persian-datepikker>
```

## datepikker inputes

| Name         | Type    | example            | default |
| ------------ | ------- | ------------------ | ------- |
| datetime     | string  | "1401/04/03 10:45" | now     |
| date         | string  | "1401/04/03"       | now     |
| selectedDate | any { } |                    | today   |
| minDate      | string  | "1401/04/03"       |         |
| maxDate      | string  | "1401/04/03"       |         |
| config       | any { } |                    |         |

## datepikker outputs

access to all the calendar's info in one object
| Name | EventEmitter |return |
| ------ | ------ |----|
| getUserSelectedDate| selectDate | object

## customize calendar

with object config , you can customize calendar

in component typescript file

```sh
let config : any = {
   theme : "normal" , //======== dark -
    sidebar : true , // =====
    //inputWidth : "300px" , // =====
    //sideHeader : "what ever you want to display" , // =====
    sideBg : "#71b1ab" , //======== side background #59d082  #00623e  #71b1ab
    sideColor : "#fff" , //======== side forground
    //sideWidth  : "180px" , //======== side width
    //sideFontSize  : "28px" , //======== side width
    //calendarWidth  : "300px" , //======== calendar width
    mode : 'datetime' , //========== date or datetime
    //buttonBg : 'red' , //====== side button background
    //buttonColor : '#fff' , //========= side button color
    //scale : "0.9" //========= scale whole of the calendar
}
```

and in component html file

```sh
<persian-datepikker  [config]="config" ></persian-datepikker>
```

[jalali]: https://www.npmjs.com/package/moment-jalaali
