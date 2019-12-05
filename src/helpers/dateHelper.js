export const formatDate = (date) => {

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let mm = date.getMinutes();
    if (mm < 10) mm = '0' + mm;

    let ss = date.getSeconds();
    if (ss < 10) ss = '0' + ss;

    return new Date([hh, mm, ss].join(':'));
}