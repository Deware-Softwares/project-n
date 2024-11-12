import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export function Calendar() {
  const firstMonthDay = new Date(new Date().setDate(1)).getDay()
  const daysInMonth = new Date(new Date().setDate(0)).getDate()
  const columns = 7
  const rows = Math.ceil((daysInMonth + firstMonthDay - 1) / columns)
  const initialDate = new Date(new Date().setDate(firstMonthDay * -1))

  function getDate(date: Date) {
    console.log(date)
  }

  return (
    <View>
      <View style={styles.calendar}>
        <View style={styles.headerRow}>
          {[...Array(columns)].map((_, column) => {
            const weekday = new Date().getDay()
            const firstWeekDay = new Date(
              new Date().setDate(new Date().getDate() - weekday + column),
            )

            const shortDayName = new Intl.DateTimeFormat('pt-BR', {
              weekday: 'short',
            })
              .format(firstWeekDay)
              .replace('.', '')

            return (
              <View style={styles.headerColumn} key={column}>
                <Text style={{ color: '#fff' }}>{shortDayName}</Text>
              </View>
            )
          })}
        </View>
        {[...Array(rows)].map((_, row) => (
          <View style={styles.row} key={row}>
            {[...Array(columns)].map((_, column) => {
              const date = new Date(
                initialDate.setDate(initialDate.getDate() + 1),
              )

              const isCurrentMonth = date.getMonth() === new Date().getMonth()

              return (
                <TouchableOpacity
                  onPress={() => getDate(date)}
                  style={styles.column}
                  key={column}
                >
                  <Text style={{ color: isCurrentMonth ? 'green' : 'red' }}>
                    {new Date(date).getDate()}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  calendar: {},

  row: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
  },

  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#262626',
    height: 30,
  },

  headerColumn: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },

  column: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    padding: 6,
    borderWidth: 1,
  },
})
