import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default class Button {
  customId: string;
  label: string;
  style: ButtonStyle;
  url: string;
  AddButtons: ButtonBuilder[];
  Disabled: boolean;

  constructor({ customId = "button", label = "button", style = ButtonStyle.Primary, url = "https://nowel.xyz/", AddButtons = [], Disabled = false }: { customId?: string, label?: string, style?: ButtonStyle, url?: string, AddButtons?: ButtonBuilder[], Disabled?: boolean } = {}) {
    this.customId = customId;
    this.label = label;
    this.style = style;
    this.url = url;
    this.AddButtons = AddButtons;
    this.Disabled = Disabled;
  }

  Build() {
    if (this.style === ButtonStyle.Link) {
      return new ButtonBuilder()
        .setURL(this.url)
        .setLabel(this.label)
        .setStyle(this.style)
        .setDisabled(this.Disabled);
    } else {
      return new ButtonBuilder()
        .setCustomId(this.customId)
        .setLabel(this.label)
        .setStyle(this.style)
        .setDisabled(this.Disabled);
    }
  }

  setup() {
    const actionRow = new ActionRowBuilder<ButtonBuilder>();
    this.AddButtons.forEach(button => {
      actionRow.addComponents(button);
    });
    return actionRow;
  }
}
