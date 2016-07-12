export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const setResponsiveHeight = (sprite, percent, parent) => {
  let percentHeight = (sprite.texture.height - (parent.height / (100 / percent))) * 100 / sprite.texture.height;
  sprite.height = parent.height / (100 / percent);
  sprite.width = sprite.texture.width - (sprite.texture.width * percentHeight / 100);
}
