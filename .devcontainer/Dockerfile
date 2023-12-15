FROM ghcr.io/archlinux/archlinux:latest

ARG USERNAME=dotfiles-dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# preinstall packages
RUN pacman -Syu --noconfirm sudo zsh git vim

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME
