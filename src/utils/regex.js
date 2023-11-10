export const validUsername = new RegExp("^[a-zA-Z0-9_]\\w{3,11}$")

export const validPassword = new RegExp("^.{8,24}$")

export const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$")

export const validName = new RegExp("^.{1,24}$")

export const validDescription = new RegExp("^.{0,120}$")

export const integerOnly = new RegExp("^[0-9]\\w{0,}$")

export const validDetails = new RegExp("^.{3,24}$")

export const validImportance = new RegExp("^[1-9]{1}$|^[1-9]\/[1-9]{1}$")