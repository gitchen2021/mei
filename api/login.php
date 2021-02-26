<?php
$tel=$_POST['tel'];
$pass=$_POST['password'];

$con=mysqli_connect('localhost','root','123456','meit');

// 【2】按照套件查询数据
$sql="SELECT*FROM `user` WHERE `tel`='$tel' AND `password`='$pass'";

$res=mysqli_query($con,$sql);
if(!$res){
    die('数据库链接错误'.mysqli_erreo($con));

}
$arr=array();
$row=mysqli_fetch_assoc($res);
while($row){
    array_push($arr,$row);
    $row=mysqli_fetch_assoc($res);  
}
//   如果没有查询到值 $arr 为空数组
if($arr){
    print_r('登录成功');
    // header('location:../.html');
}else{
    print_r('用户名或者密码错误');
}
// print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>