/**
 * Created by Weil on 16/3/27.
 */

function ajax ({url, type} = {url: '', type: 'get'}) {
  console.log(url, type);
}

function ajax2 ({url = '', type = 'get'}) {
  console.log(url, type);
}

ajax({url: 'zf.js'});
ajax2({url: 'zf.js'});