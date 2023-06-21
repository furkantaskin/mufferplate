<?php


function getSprite($spriteId, $className = "")
{
    $spriteSheetPath = domain . 'assets/img/svg/sprite.svg';
    $spriteSheet = new SimpleXMLElement(file_get_contents($spriteSheetPath));
    $sprite = $spriteSheet->xpath("//*[@id='$spriteId']")[0];
    $viewBox = (string)$sprite['viewBox'];
    return
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='$viewBox' class='$className'>
<use xlink:href='" . domain . "assets/img/svg/sprite.svg#" . $spriteId . "'/>
</svg>";
}

?>