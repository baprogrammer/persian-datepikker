import { Component, EventEmitter, Input, OnInit , Output, Renderer2 } from '@angular/core';

import moment from'moment-jalaali';

@Component({
  selector: 'persian-datepikker',
  templateUrl: './persian-datepikker.component.html',
  styleUrls: ['./persian-datepikker.component.less']
})
export class PersianDatepikkerComponent implements OnInit {

  enDate : any = { year : "" , month : "" , day : "" };
  today : any = { year : "" , month : "" , day : "" };
  displayDate : string = "" ;
  days : any = [] ;
  
  daysTitle : any = ["ش" , "ی" , "د" , "س" , "چ" , "پ" , "ج"] ;
  Months : any = [
    { value : 'فروردین' }  ,
    { value : 'اردیبهشت' }  ,
    { value : 'خرداد' }  ,
    { value : 'تیر' }  ,
    { value : 'مرداد' }  ,
    { value : 'شهریور' }  ,
    { value : 'مهر' }  ,
    { value : 'آبان' }  ,
    { value : 'آذر' }  ,
    { value : 'دی' }  ,
    { value : 'بهمن' }  ,
    { value : 'اسفند' }  ,
     
    ] ;

  @Input() selectedDate : any ;
  

  selectedScreen : string = "date" ;
  currentShowingMonth : any = { index : "" , value : "" };
  currentShowingYear : number = 0 ;

  isNextEnabled  : boolean = true ;
  isPrevEnabled : boolean = true ;

  @Input() minDate : string = "" ; // 1401/3/7
  @Input() maxDate : string = "" ; // 1401/3/7
  
  @Input() date : string = "" ; // 1401/3/7
  @Input() datetime : string =""; //==== 1402/5/12 23:45
  @Input() config   : any  = { 
    theme : "normal" , //======== dark - 
    sidebar : true , // =====
    //inputWidth : "300px" , // =====
    //sideHeader : "انتخاب تاریخ قرعه کشی" , // =====
    sideBg : "#71b1ab" , //======== side background #59d082  #00623e  #71b1ab
    sideColor : "#fff" , //======== side forground 
    //sideWidth  : "180px" , //======== side width
    //sideFontSize  : "28px" , //======== side width
    //calendarWidth  : "300px" , //======== calendar width
    mode : 'datetime' , //========== date or datetime
    //buttonBg : 'red' ,
    //buttonColor : '#fff' ,
    //scale : "0.9"
    
  }; 

  displayCalendar : boolean = false ;

  @Output() getUserSelectedDate = new EventEmitter<any>() ;
  

  constructor(private renderer: Renderer2) {
    
    
    this.today = this.initDate();
    
   }

  ngOnInit(): void {
    this.checkValidation() ;
    if(!this.selectedDate){
      if(this.datetime != ""){
        this.initWithJustDatetime(this.datetime);
      }
      else{
        if(this.date != ""){
          this.initWithJustDate(this.date);
        }
        else{
          this.selectedDate = this.today ;
        }
      }
    }
    this.updateCurrentSettings(this.selectedDate.year , this.selectedDate.month);
    this.getCalendar(this.currentShowingYear , this.currentShowingMonth.index , this.selectedDate );
    this.setDisplayDate();
    
  }

  initWithJustDate(date : string){
    let y = moment(date , 'jYYYY/jM/jD').format('YYYY/M/D');
    this.selectedDate = this.initDate(y);
  }

  initWithJustDatetime(datetime : string){
    let y = moment(datetime , 'jYYYY/jM/jD').format('YYYY/M/D');
    let dateTimeValues = datetime.split(" ");
    let time   = dateTimeValues[1]; //======== get time from datetime
    this.selectedDate = this.initDate(y , time );
  }

  goToToday(){
    // ============== check for min and max
    let z =  moment(this.today.date , 'jYYYY/jM/jD').format('jYYYY/jM/jD'); 
    let min = this.checkMinDate(this.minDate , z) ;
    let max = this.checkMaxDate(this.maxDate , z) ;
    // ============== check for min and max
    if(!min && !max){
      this.selectedDate = this.today ;
    }
    this.getCalendar(this.today.year , this.today.month , this.selectedDate);
    this.selectMonth(this.today.month);
  }

  focusInput(){
    let onElement = this.renderer.selectRootElement('#dateInput');
    onElement.focus();
  }

  showCalendar(){
    this.displayCalendar = true ;
  }

  hideCalendar(){
      this.displayCalendar = false ;
  }

  getDateString(daysOfWeek : number = 0){
    let day = "" ;
    switch (daysOfWeek) {
      case 0 :
        day = "یک شنبه";
        break;
      case 1 :
        day = "دو شنبه";
        break;
      case 2 :
        day = "سه شنبه";
        break;
      case 3 :
        day = "چهار شنبه";
        break;
      case 4 :
        day = "پنج شنبه";
        break;
      case 5 :
        day = "جمعه ";
        break;
      case 6 :
        day = "شنبه ";
        break;
    
      default: day = "یک شنبه";
        break;
    }
    return day ;
  }

  getMonthString(monthNumber : number = 1 ){
    let month = "" ;
    switch (monthNumber) {
      case 1 :
        month = "فروردین"
        break;
      case 2 :
        month = "اردیبهشت"
        break;
      case 3 :
        month = "خرداد"
        break;
      case 4 :
        month = "تیر"
        break;
      case 5 :
        month = "مرداد"
        break;
      case 6 :
        month = "شهریور"
        break;
      case 7 :
        month = "مهر"
        break;
      case 8 :
        month = "آبان"
        break;
      case 9 :
        month = "آذر"
        break;
      case 10 :
        month = "دی"
        break;
      case 11 :
        month = "بهمن"
        break;
      case 12 :
        month = "اسفند"
        break;
    
      default: month = "فروردین"
        break;
    }
    return month ;
  }

  getDaysInMonth(monthNumber : number = 1 , year : number){
    let daysInMonth = 30 ;
    if(monthNumber <= 6){
      daysInMonth = 31 ;
    }
    else if(monthNumber == 12){ 
    
      if(moment.jIsLeapYear(year)){
        daysInMonth = 30 ;
      }
      else{
        daysInMonth = 29 ;
      }
    }
    return daysInMonth ;
  }

  getDaysOfWeek(date = ""){
    let enToday = new Date();
    if(date != ''){
      enToday = new Date(date) ;
    }
    return enToday.getDay();
  }

  initDate(date = '' , time = ''){

    let enToday = new Date();
    if(date != ''){
      if(this.selectedDate){
        enToday = new Date( date+" "+this.selectedDate.time.HM  ) ;
      }
      else{
        if(time != ''){
          enToday = new Date( date+" "+time ) ;
        }
        else{
          enToday = new Date( date+" "+new Date().getHours()+":"+new Date().getMinutes() ) ;
        }
      }
    }
    
    this.enDate.year = enToday.getFullYear();
    this.enDate.month = enToday.getMonth()+1;
    this.enDate.day = enToday.getDate();
    let today : any = {  } ;
    let enFullDate = this.enDate.year+"/"+this.enDate.month+"/"+this.enDate.day ;
    
    today.miladi = enToday ;
    today.year = moment(enFullDate).jYear();
    today.month = moment(enFullDate).jMonth()+1;
    today.day = moment(enFullDate).jDate();
    today.daysInMonth = this.getDaysInMonth(today.month , today.year);
    today.daysOfWeek = enToday.getDay();
    today.dayString = this.getDateString(today.daysOfWeek);
    today.monthString = this.getMonthString(today.month);
    today.FullDate =  today.dayString+" "+today.day+" "+today.monthString+" "+today.year ;
    today.date =  moment(enFullDate).format('jYYYY/jM/jD');
    
    today.time =  {
      hour : enToday.getHours() ,
      minute  : enToday.getMinutes() ,
      miliseconds  : enToday.getMilliseconds() ,
      HMS  : this.resolveClock(enToday.getHours())+":"+this.resolveClock(enToday.getMinutes())+":"+this.resolveClock(enToday.getMilliseconds()) ,
      HM  : this.resolveClock(enToday.getHours())+":"+this.resolveClock(enToday.getMinutes()) ,
      timestamp : enToday.getTime()
    }
    today.dateTime = today.date+" "+today.time.HM ;
    
    return today ;
  }

  resolveClock(time : number){
    if(time < 10){
      return "0"+time ;
    }
    else{
      return time ;
    }
  }


  getCalendar(year : number , month : number , selectedDate ?: any ){
    
    month-- ;
    this.days = [] ;
    let days : any = [{ date : "" , value : "" }] ;
    let thisMonth = moment().jYear(year).jMonth(month).startOf('jMonth').format('jYYYY/jM/jD');
    let lastMonth = moment().jYear(year).jMonth(month-1).startOf('jMonth').format('jYYYY/jM/jD');
    let nextMonth = moment().jYear(year).jMonth(month+1).startOf('jMonth').format('jYYYY/jM/jD');
    //============= check for min Date =========================
    let min = this.checkMinDate(this.minDate , thisMonth) ;
    if(min){
      this.isPrevEnabled = false ;
    }
    else{
      this.isPrevEnabled = true ;
    }
    //===========================================================
    //============= check for max Date =========================
    let max = this.checkMaxDate(this.maxDate , nextMonth) ;
    if(max){
      this.isNextEnabled = false ;
    }
    else{
      this.isNextEnabled = true ;
    }
    //===========================================================
    if(month == 0){
      lastMonth = moment().jYear(year-1).jMonth(11).startOf('jMonth').format('jYYYY/jM/jD');
    }

    if(month == 11){
      nextMonth = moment().jYear(year+1).jMonth(0).startOf('jMonth').format('jYYYY/jM/jD');
    }
    
    let y = moment(thisMonth , 'jYYYY/jM/jD').format('YYYY/M/D');
    let z = moment(lastMonth , 'jYYYY/jM/jD').format('YYYY/M/D');
    let N = moment(nextMonth , 'jYYYY/jM/jD').format('YYYY/M/D');
    
    
    let firstDay = this.initDate(y);
    let lastMonthDay = this.initDate(z);
    let nextMonthDay = this.initDate(N);
    
    
    // =========== last month ===============================
    if(firstDay.daysOfWeek != 6){
      for(let j = ( firstDay.daysOfWeek ) ; j >= 0  ; j--){
        let day : any = {  };
        day.date = (lastMonthDay.daysInMonth - j) ;
        day.value = lastMonthDay.year+"/"+(lastMonthDay.month)+"/"+(lastMonthDay.daysInMonth - j) ;
        day.isMain = false ;
        this.days.push(day) ;
      }
    }
    //=======================================================
    //================ this month ============================
    for(let i=1 ; i<= firstDay.daysInMonth ; i++ ){
      let day : any = {  };
      day.isSelected = false ;
      day.date = i ;
      day.value = year+"/"+(month+1)+"/"+i ;
      
      day.isMain = true ;
      if(selectedDate){
        if(selectedDate.date == day.value ){
          day.isSelected = true ;
        }
      }
      else{
        if(this.today.date == day.value){
          day.isSelected = true ;
        }
      }
      this.days.push(day) ;
    }
    //============================================================
    let endMonth = moment().jYear(year).jMonth(month).endOf('jMonth').format('jYYYY/jM/jD');
    let lastDayOfWeek = moment(endMonth , 'jYYYY/jM/jD').format('YYYY/M/D'); 
    let dayOfWeek = this.getDaysOfWeek(lastDayOfWeek) ;
    if(dayOfWeek == 6){
      dayOfWeek = -1 ;
    }
    
    for(let i = 1 ; i<= ( 5 - dayOfWeek ) ; i++ ){
      let day : any = {  };
      day.date = i ;
      day.value = nextMonthDay.year+"/"+nextMonthDay.month+"/"+i ;
      day.isMain = false ;
      this.days.push(day) ;
    }
    
// =============== add cursor not allowed to not valid dates =================
    for(let day of this.days){
      let z =  moment(day.value , 'jYYYY/jM/jD').format('jYYYY/jM/jD'); 
      let min = this.checkMinDate(this.minDate , z) ;
      if(min){
        day.notAllowed = true ;
      }
      let max = this.checkMaxDate(this.maxDate , z) ;
      if(max){
        day.notAllowed = true ;
      }
    }
    // ==================================================================

    
    

  }

  selectDate(day : any){
    let y = moment(day.value , 'jYYYY/jM/jD').format('YYYY/M/D');
    //============= check for min Date =========================
    let z =  moment(day.value , 'jYYYY/jM/jD').format('jYYYY/jM/jD'); 
    let min = this.checkMinDate(this.minDate , z) ;
    let max = this.checkMaxDate(this.maxDate , z) ;
    
    if(!min && !max ){ 
      this.selectedDate = this.initDate(y);
      this.updateCurrentSettings(this.selectedDate.year , this.selectedDate.month) ;
      this.getCalendar(this.selectedDate.year , this.selectedDate.month , this.selectedDate);
      this.setDisplayDate();
      this.getUserSelectedDate.emit(this.selectedDate);
    }
    //===========================================================
  }

  setDisplayDate(){
    if(this.config.mode == 'date'){
      this.displayDate = this.selectedDate.date ;
    }
    else{
      this.displayDate = this.selectedDate.dateTime ;
    }
  }
  
  selectMonth(month : any , year : any = this.selectedDate.year , isDisabled : boolean = false ){
    if(!isDisabled){
      year = this.currentShowingYear ;
      let y = moment(year+"/"+month+"/1" , 'jYYYY/jM/jD').format('YYYY/M/D');
      let Date = this.initDate(y);
      this.currentShowingMonth.value = this.getMonthString(month);
      this.currentShowingMonth.index = month ;
      this.showCalendarDates();
      this.getCalendar(Date.year , Date.month , this.selectedDate);
    }
  }

  showNextMonth(){
    let month = this.currentShowingMonth.index + 1 ;
    if(month > 12){
      month = 1 ;
      this.currentShowingYear ++ ;
    }
    this.selectMonth(month , this.currentShowingYear);
  }

  showPrevMonth(){
    let month = this.currentShowingMonth.index - 1 ;
    if(month < 1){
      month = 12 ;
      this.currentShowingYear -- ;
    }
    this.selectMonth(month , this.currentShowingYear);
  }

  showNextYear(){
    this.currentShowingYear ++ ;
    this.updateCalendarMonths(this.currentShowingYear )
  }
  showPrevYear(){
    this.currentShowingYear -- ;
   this.updateCalendarMonths(this.currentShowingYear )
  }

  updateCalendarMonths(year : number){
    this.getCalendar(year , 1 , this.selectedDate);
    this.showCalendarMonths();
  }

  showCalendarMonths(){
    this.selectedScreen = "month" ;
    let index = 0 ;
    for(let month of this.Months){
      month.notAllowed = false ;
      index++ ;
      let daysOfMonth = this.getDaysInMonth(index,this.currentShowingYear) ;
      let z =  moment(this.currentShowingYear+"/"+index+"/"+daysOfMonth , 'jYYYY/jM/jD').format('jYYYY/jM/jD'); 
      let z2 =  moment(this.currentShowingYear+"/"+index+"/1" , 'jYYYY/jM/jD').format('jYYYY/jM/jD'); 
      let min = this.checkMinDate(this.minDate , z) ;
      if(min){
        month.notAllowed = true ;
        this.isPrevEnabled = false ;
      }
      let max = this.checkMaxDate(this.maxDate , z2) ;
      if(max){
        month.notAllowed = true ;
        this.isNextEnabled = false ;
      }
    }
  }

  showCalendarDates(){
    this.selectedScreen = "date" ;
  }
  
  updateCurrentSettings(year : number , month : any ){
    this.currentShowingYear = year ;
    this.currentShowingMonth.index = month ;
    this.currentShowingMonth.value = this.getMonthString(month); 
  }

  checkMinDate(minDate : string , Date : string ){
    if(minDate != ''){
      let min = this.initDate(minDate) ;
      let date  =  this.initDate(Date) ;
      if(date.time.timestamp < min.time.timestamp){
        return true ;
      }
      else{
        return false ;
      }
    }
    else{
      return false ;
    }
  }

  checkMaxDate(maxDate : string , Date : string ){
    if(maxDate != ''){
      let max = this.initDate(maxDate) ;
      let date  =  this.initDate(Date) ;
      
      if(date.time.timestamp > max.time.timestamp){
        return true ;
      }
      else{
        return false ;
      }
    }
    else{
      return false ;
    }
  }

  isValidDate(date : string){
    return moment( date , 'jYYYY/jMM/jDD ').isValid() ;
  }

  checkValidation(){
    if(!this.isValidDate(this.minDate)){
      this.minDate = "" ;
      console.error("minDate is not valid ; valid format : 1401/5/24 ");
    }
    if(!this.isValidDate(this.maxDate)){
      this.maxDate = "" ;
      console.error("maxDate is not valid ; valid format : 1401/5/24 ");
    }
    if(this.date != ''){
      if(!this.isValidDate(this.date)){
        this.date = "" ;
        console.error("date is not valid ; valid format : 1401/5/24 ");
      }
    }
  }


}
