/**
 * Created by Weil on 16/3/27.
 */

function ajax () {
  return new Promise((resolve, reject) => {
    resolve();
    reject();
  });
}

// 第二个请求的参数 是第一个请求的返回值

// 一个员工 有一个员工名字 查员工的工资 用员工的ID

ajax('员工名字')
  .then((res) => {
    ajax(res.data.userId)
      .then(() => {

      })
      .catch(() => {
        alert('请求错误/ID不存在');
      });
  })
  .catch(() => {
    alert('请求错误/名字不存在');
  });
