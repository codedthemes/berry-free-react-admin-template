import value from '../assets/scss/_themes-vars.module.scss';

/**
 * MUI Componets whose styles are overrided as per theme
 */
export function componentStyleOverrides(theme) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    borderRadius: '4px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    //border: '1px solid',
                    borderRadius: theme.customization.borderRadius + 'px'
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: value.textDark,
                    padding: '24px'
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    alignItems: 'center'
                }
            }
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.MuiListItem-root': {
                        color: theme.textPrimary,
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        '&.Mui-selected': {
                            color: theme.menuSelected,
                            backgroundColor: theme.menuSelectedBack,
                            '&:hover': {
                                backgroundColor: theme.menuSelectedBack
                            },
                            '& .MuiListItemIcon-root': {
                                color: theme.menuSelected
                            }
                        },
                        '&:hover': {
                            backgroundColor: theme.menuSelectedBack,
                            color: theme.menuSelected,
                            '& .MuiListItemIcon-root': {
                                color: theme.menuSelected
                            }
                        }
                    },
                    '&.MuiOutlinedInput-root': {
                        //borderRadius: customization.borderRadius + 'px'
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.textPrimary,
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.textSecondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: value.grey50,
                    borderRadius: theme.customization.borderRadius + 'px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: value.grey400
                    },
                    '&:hover $notchedOutline': {
                        borderColor: value.blue50
                    }
                },
                input: {
                    background: value.grey50,
                    padding: '15.5px 14px',
                    fontWeight:500,
                    borderRadius: theme.customization.borderRadius + 'px'
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: theme.customization.borderRadius + 'px'
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: value.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    '& .MuiAutocomplete-tag': {
                        background: value.deepPurple50,
                        borderRadius: 4,
                        color: theme.textDark,
                        '.MuiChip-deleteIcon': {
                            color: value.deepPurple200
                        }
                    }
                },
                popper: {
                    borderRadius: theme.customization.borderRadius + 'px',
                    boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    '&:focus': {
                        backgroundColor: 'transparent'
                    }
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                select: {
                    fontSize: '28px'
                }
            },
            MuiSvgIcon: {
                styleOverrides: {
                    select: {
                        borderRadius: '6px',
                        width: '1.2em',
                        height: '1.2em'
                    }
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: value.blue600,
                    background: value.blue200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTimelineContent: {
            styleOverrides: {
                root: {
                    color: theme.textDark,
                    fontSize: '16px'
                }
            }
        },
        MuiTreeItem: {
            styleOverrides: {
                label: {
                    marginTop: 8,
                    marginBottom: 8
                }
            }
        },
        MuiTimelineDot: {
            styleOverrides: {
                root: {
                    boxShadow: 'none'
                }
            }
        },
        MuiDateTimePickerTabs: {
            styleOverrides: {
                tabs: {
                    backgroundColor: value.blue50,
                    '& .MuiTabs-scroller': {
                        '& .MuiTabs-flexContainer .MuiButtonBase-root.MuiTab-textColorPrimary': {
                            color: theme.textDark,
                            '&.Mui-selected': {
                                color: value.blue600
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: value.blue500
                        }
                    }
                }
            }
        },
        MuiClock: {
            styleOverrides: {
                root: {
                    '& .MuiIconButton-root': {
                        padding: '4px',
                        bottom: '14px',
                        '& .MuiIconButton-label .MuiTypography-root': {
                            color: theme.textDark,
                            fontSize: '0.625rem'
                        },
                        '&.MuiClock-meridiemButtonSelected': {
                            backgroundColor: value.blue600,
                            '& .MuiIconButton-label .MuiTypography-root': {
                                color: theme.paper
                            }
                        }
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: '12px 12px 12px 0'
                }
            }
        }
    };
}
