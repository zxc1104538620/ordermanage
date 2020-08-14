export function getchinaTime(a) {
  var newTime = new Date(a);
  newTime = `${newTime.getFullYear()}-${
    Number(newTime.getMonth()) >= 10
      ? newTime.getMonth() + 1
      : "0" + (newTime.getMonth() + 1)
    }-${
    Number(newTime.getDate()) >= 10
      ? newTime.getDate()
      : "0" + newTime.getDate()
    } ${
    Number(newTime.getHours()) >= 10
      ? newTime.getHours()
      : "0" + newTime.getHours()
    }:${
    Number(newTime.getMinutes()) >= 10
      ? newTime.getMinutes()
      : "0" + newTime.getMinutes()
    }:${
    Number(newTime.getSeconds()) >= 10
      ? newTime.getSeconds()
      : "0" + newTime.getSeconds()
    }`;
  a = newTime;
  return a
}
export function getchinaTime2(time) {
  time = `${new Date(time).getFullYear()}-${
    Number(new Date(time).getMonth()) >= 10
      ? new Date(time).getMonth() + 1
      : "0" + (new Date(time).getMonth() + 1)
    }-${
    Number(new Date(time).getDate()) >= 10
      ? new Date(time).getDate()
      : "0" + new Date(time).getDate()
    } ${
    Number(new Date(time).getHours()) >= 10
      ? new Date(time).getHours()
      : "0" + new Date(time).getHours()
    }:${
    Number(new Date(time).getMinutes()) >= 10
      ? new Date(time).getMinutes()
      : "0" + new Date(time).getMinutes()
    }:${
    Number(new Date(time).getSeconds()) >= 10
      ? new Date(time).getSeconds()
      : "0" + new Date(time).getSeconds()
    }`;
  return time
}