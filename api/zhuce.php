<?php
$tel=$_POST['tel'];
$pass=$_POST['password'];

// （1）链接数据库
$con=mysqli_connect('localhost','root','123456','meit');

// select
// （2）设置对应的SQL语句
$sql="SELECT*FROM`user` WHERE `tel`='$tel'";

// （3）执行SQL语句
$res=mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误'.mysqli_error($con));

}
$arr=array();

// `mysqli_fetch_assoc()` 解析你结果中的第一条，以 关联型数组 的形式返回 
$row=mysqli_fetch_assoc($res);
while($row){

    // 向数组中添加数据 ： `array_push(需要添加数据的数组，数据);`
    array_push($arr,$row);
    $row=mysqli_fetch_assoc($res);
}
if($arr){
    print_r('用户名已被注册');
    // header('location:./login.html');
}else{
    // print_r('用户名还未被注册');
    $sql1="INSERT INTO `user` VALUES(null,'$tel','$pass')";
    $res1=mysqli_query($con,$sql1);
    print_r('用户名注册成功');
// header('location:./login.html');
// location:./login.html;

}

?>