/**
 * Created by Weil on 16/3/27.
 */
function func ({url = 123, type = 'get'}) {
  console.log(url, type);
}

function func2 ({url, type} = {url: '', type: 'get'}) {
  console.log(url, type);
}

func({
  url: 333
});